const mockAxios = jest.genMockFromModule('axios');
mockAxios.create = jest.fn(() => mockAxios);

// const mockAxios = jest.mock('axios', () => ({
//     create: jest.fn(() => mockAxios)
// }));

export default mockAxios;
