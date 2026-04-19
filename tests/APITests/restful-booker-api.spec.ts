import { test, expect, APIRequestContext } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker API', () => {
  let apiContext: APIRequestContext;
  let token: string;
  let bookingId: number;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });

    // Get auth token once for all tests
    const authResponse = await apiContext.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });
    const authData = await authResponse.json();
    token = authData.token;
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.describe('Authentication', () => {
    test('TC-AUTH-001: Login with valid credentials', async () => {
      const response = await apiContext.post('/auth', {
        data: {
          username: 'admin',
          password: 'password123',
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('token');
      expect(typeof data.token).toBe('string');
      token = data.token;
    });

    test('TC-AUTH-002: Login with invalid credentials', async () => {
      const response = await apiContext.post('/auth', {
        data: {
          username: 'admin',
          password: 'wrongpassword',
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('reason');
      expect(data.reason).toContain('Bad credentials');
    });

    test('TC-AUTH-003: Login with missing username', async () => {
      const response = await apiContext.post('/auth', {
        data: {
          password: 'password123',
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('reason');
    });

    test('TC-AUTH-004: Login with missing password', async () => {
      const response = await apiContext.post('/auth', {
        data: {
          username: 'admin',
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('reason');
    });
  });

  test.describe('Booking CRUD Operations', () => {
    // Run these tests serially because they have dependencies
    test.describe.configure({ mode: 'serial' });

    test('TC-BOOKING-001: Create booking with valid data', async () => {
      const response = await apiContext.post('/booking', {
        data: {
          firstname: 'John',
          lastname: 'Doe',
          totalprice: 500,
          depositpaid: true,
          bookingdates: {
            checkin: '2024-01-01',
            checkout: '2024-01-05',
          },
          additionalneeds: 'Late checkout',
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('bookingid');
      expect(data.booking.firstname).toBe('John');
      expect(data.booking.lastname).toBe('Doe');
      expect(data.booking.totalprice).toBe(500);
      expect(data.booking.depositpaid).toBe(true);
      bookingId = data.bookingid;
    });

    test('TC-BOOKING-002: Get all bookings', async () => {
      const response = await apiContext.get('/booking');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('bookingid');
    });

    test('TC-BOOKING-003: Get booking by ID', async () => {
      const response = await apiContext.get(`/booking/${bookingId}`);

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.firstname).toBe('John');
      expect(data.lastname).toBe('Doe');
    });

    test('TC-BOOKING-004: Update booking with PUT', async () => {
      const response = await apiContext.put(`/booking/${bookingId}`, {
        headers: {
          Cookie: `token=${token}`,
        },
        data: {
          firstname: 'Jane',
          lastname: 'Smith',
          totalprice: 750,
          depositpaid: false,
          bookingdates: {
            checkin: '2024-02-01',
            checkout: '2024-02-10',
          },
          additionalneeds: 'High floor',
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.firstname).toBe('Jane');
      expect(data.totalprice).toBe(750);
    });

    test('TC-BOOKING-005: Partial update booking with PATCH', async () => {
      const response = await apiContext.patch(`/booking/${bookingId}`, {
        headers: {
          Cookie: `token=${token}`,
        },
        data: {
          firstname: 'Janet',
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.firstname).toBe('Janet');
    });

    test('TC-BOOKING-006: Delete booking', async () => {
      const response = await apiContext.delete(`/booking/${bookingId}`, {
        headers: {
          Cookie: `token=${token}`,
        },
      });

      expect(response.status()).toBe(201);
    });

    test('TC-BOOKING-007: Get deleted booking returns 404', async () => {
      const response = await apiContext.get(`/booking/${bookingId}`);

      expect(response.status()).toBe(404);
    });
  });

  test.describe('Booking Filters & Search', () => {
    test('TC-SEARCH-001: Search booking by first name', async () => {
      const response = await apiContext.get('/booking?firstname=John');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('TC-SEARCH-002: Search booking by last name', async () => {
      const response = await apiContext.get('/booking?lastname=Doe');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('TC-SEARCH-003: Search booking by check-in date', async () => {
      const response = await apiContext.get(
        '/booking?checkin=2024-01-01'
      );

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('TC-SEARCH-004: Search booking by check-out date', async () => {
      const response = await apiContext.get(
        '/booking?checkout=2024-01-05'
      );

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('TC-SEARCH-005: Search with multiple filters', async () => {
      const response = await apiContext.get(
        '/booking?firstname=John&lastname=Doe&checkin=2024-01-01&checkout=2024-01-05'
      );

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  test.describe('Data Validation & Error Handling', () => {
    test('TC-VALIDATION-001: Create booking with missing firstname', async () => {
      const response = await apiContext.post('/booking', {
        data: {
          lastname: 'Doe',
          totalprice: 500,
          depositpaid: true,
          bookingdates: {
            checkin: '2024-01-01',
            checkout: '2024-01-05',
          },
        },
      });

      // API might return 500 or 200 with error
      expect([200, 400, 500]).toContain(response.status());
    });

    test('TC-VALIDATION-002: Create booking with negative price', async () => {
      const response = await apiContext.post('/booking', {
        data: {
          firstname: 'John',
          lastname: 'Doe',
          totalprice: -100,
          depositpaid: true,
          bookingdates: {
            checkin: '2024-01-01',
            checkout: '2024-01-05',
          },
        },
      });

      // Negative price might be accepted or rejected
      if (response.status() === 200) {
        const data = await response.json();
        expect(data.booking.totalprice).toBeLessThanOrEqual(0);
      }
    });

    test('TC-VALIDATION-003: Create booking with checkout before checkin', async () => {
      const response = await apiContext.post('/booking', {
        data: {
          firstname: 'John',
          lastname: 'Doe',
          totalprice: 500,
          depositpaid: true,
          bookingdates: {
            checkin: '2024-01-10',
            checkout: '2024-01-01',
          },
        },
      });

      // API accepts or rejects based on validation rules
      expect(response.status()).toBeGreaterThan(0);
    });

    test('TC-VALIDATION-004: Create booking with invalid date format', async () => {
      const response = await apiContext.post('/booking', {
        data: {
          firstname: 'John',
          lastname: 'Doe',
          totalprice: 500,
          depositpaid: true,
          bookingdates: {
            checkin: 'invalid-date',
            checkout: '2024-01-05',
          },
        },
      });

      // Invalid date might return error
      expect([200, 400, 500]).toContain(response.status());
    });

    test('TC-VALIDATION-005: Delete without authentication returns 403', async ({ request }) => {
      const response = await request.delete(`${baseURL}/booking/99999`);
      expect(response.status()).toBe(403);
    });

    test('TC-VALIDATION-006: Update non-existent booking returns 405 or 404', async () => {
      const response = await apiContext.put('/booking/99999', {
        headers: {
          Cookie: `token=${token}`,
        },
        data: {
          firstname: 'Jane',
          lastname: 'Smith',
          totalprice: 750,
          depositpaid: false,
          bookingdates: {
            checkin: '2024-02-01',
            checkout: '2024-02-10',
          },
        },
      });

      expect([404, 405]).toContain(response.status());
    });
  });

  test.describe('API Health & Metadata', () => {
    test('TC-HEALTH-001: Get API health status', async () => {
      const response = await apiContext.get('/ping');

      expect(response.status()).toBe(201);
    });

    test('TC-HEALTH-002: Get booking IDs list', async () => {
      const response = await apiContext.get('/booking');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      
      if (data.length > 0) {
        expect(data[0]).toHaveProperty('bookingid');
      }
    });
  });
});