// import { jest, describe, it, expect } from '@jest/globals';
// import Http from './httpRequest';
// import axios from 'axios';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('Http', () => {
//   let http: typeof Http;

//   beforeEach(() => {
//     jest.clearAllMocks();
//     http = new Http({
//       baseURL: 'https://api.example.com',
//       timeout: 5000,
//     });
//   });

//   test('constructor creates axios instance with correct config', () => {
//     expect(mockedAxios.create).toHaveBeenCalledWith({
//       baseURL: 'https://api.example.com',
//       timeout: 5000,
//     });
//   });

//   test('get method calls axios.get with correct parameters', async () => {
//     const mockResponse = { data: 'test data' };
//     mockedAxios.create.mockReturnValue({
//       get: jest.fn().mockResolvedValue(mockResponse),
//     } as any);

//     const response = await http.get('/test');
//     expect(response).toEqual(mockResponse);
//     expect(mockedAxios.create().get).toHaveBeenCalledWith('/test', undefined);
//   });

//   test('post method calls axios.post with correct parameters', async () => {
//     const mockResponse = { data: 'test data' };
//     mockedAxios.create.mockReturnValue({
//       post: jest.fn().mockResolvedValue(mockResponse),
//     } as any);

//     const data = { key: 'value' };
//     const response = await http.post('/test', data);
//     expect(response).toEqual(mockResponse);
//     expect(mockedAxios.create().post).toHaveBeenCalledWith('/test', data, undefined);
//   });

//   test('setAuthToken sets token in sessionStorage and axios headers', () => {
//     const token = 'test-token';
//     http.setAuthToken(token);

//     expect(sessionStorage.setItem).toHaveBeenCalledWith('access_token', token);
//     expect(mockedAxios.create().defaults.headers['Authorization']).toBe(`Bearer ${token}`);
//   });

//   test('invalidateAuthToken removes token from sessionStorage and axios headers', () => {
//     http.invalidateAuthToken();

//     expect(sessionStorage.removeItem).toHaveBeenCalledWith('access_token');
//     expect(mockedAxios.create().defaults.headers['Authorization']).toBeUndefined();
//   });

//   test('setOrgHeader sets X-Org-Id header', () => {
//     const orgId = 'test-org';
//     http.setOrgHeader(orgId);

//     expect(mockedAxios.create().defaults.headers['X-Org-Id']).toBe(orgId);
//   });

//   test('invalidateOrgHeader removes X-Org-Id header', () => {
//     http.invalidateOrgHeader();

//     expect(mockedAxios.create().defaults.headers['X-Org-Id']).toBeUndefined();
//   });
// });

// describe('fetchAuthHeaders', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('returns headers with Content-Type and accept', () => {
//     const headers = fetchAuthHeaders();

//     expect(headers['Content-Type']).toBe('application/json');
//     expect(headers['accept']).toBe('application/json');
//   });

//   test('includes Authorization header when token is present in sessionStorage', () => {
//     const token = 'test-token';
//     jest.spyOn(sessionStorage, 'getItem').mockReturnValue(token);

//     const headers = fetchAuthHeaders();

//     expect(headers['Authorization']).toBe(`Bearer ${token}`);
//   });

//   test('does not include Authorization header when token is not present in sessionStorage', () => {
//     jest.spyOn(sessionStorage, 'getItem').mockReturnValue(null);

//     const headers = fetchAuthHeaders();

//     expect(headers['Authorization']).toBeUndefined();
//   });
// });