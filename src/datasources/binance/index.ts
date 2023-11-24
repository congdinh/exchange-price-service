const { RESTDataSource } = require('@apollo/datasource-rest');

export class BinanceAPIDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.binance.com/api/v1/';
    this.futureURL = 'https://fapi.binance.com/';
    this.fundingInfoURL = 'https://www.binance.com/fapi/v1/premiumIndex';
  }

  async getExchangeInfo() {
    const data = await this.get('exchangeInfo');
    return data;
  }

  async getFutureData(symbol: string) {
    const data = await this.get(`${this.futureURL}fapi/v1/klines?`, {
      params: {
        symbol,
        interval: '1m'
      }
    });
    return data;
  }

  async getFundingData() {
    const data = await this.get(this.fundingInfoURL);
    return data;
  }

  async getTicker24hrData(symbol: string) {
    let data = await this.get(`${this.futureURL}fapi/v1/ticker/24hr`, {
      params: {
        symbol
      }
    });
    if (symbol) data = [data];
    return data;
  }
}
