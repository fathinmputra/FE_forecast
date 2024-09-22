import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class AxiosService {
  private static createAxiosInstance(baseUrl: string | undefined) {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static get AxiosServiceInventory() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_INVENTORY
        : process.env.NEXT_PUBLIC_API_LOCAL_INVENTORY;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceManufacturing() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_MANUFACTURING
        : process.env.NEXT_PUBLIC_API_LOCAL_MANUFACTURING;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceAccountPayable() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_ACCOUNT_PAYABLE
        : process.env.NEXT_PUBLIC_API_LOCAL_ACCOUNT_PAYABLE;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceAccountReceivable() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_ACCOUNT_RECEIVABLE
        : process.env.NEXT_PUBLIC_API_LOCAL_ACCOUNT_RECEIVABLE;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceCashBank() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_CASH_BANK
        : process.env.NEXT_PUBLIC_API_LOCAL_CASH_BANK;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceHRM() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_HRM
        : process.env.NEXT_PUBLIC_API_LOCAL_HRM;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceFixedAsset() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_FIXED_ASSET
        : process.env.NEXT_PUBLIC_API_LOCAL_FIXED_ASSET;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServicePurchasing() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_PURCHASING
        : process.env.NEXT_PUBLIC_API_LOCAL_PURCHASING;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceSales() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_SALES
        : process.env.NEXT_PUBLIC_API_LOCAL_SALES;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceGeneralSystem() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_GENERAL_SYSTEM
        : process.env.NEXT_PUBLIC_API_LOCAL_GENERAL_SYSTEM;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceGeneralLedger() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_GENERAL_LEDGER
        : process.env.NEXT_PUBLIC_API_LOCAL_GENERAL_LEDGER;
    return this.createAxiosInstance(baseUrl);
  }

  static get AxiosServiceScheduling() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_SCHEDULING
        : process.env.NEXT_PUBLIC_API_LOCAL_SCHEDULING;
    return this.createAxiosInstance(baseUrl);
  }

  /*
  * SUPPLIER PORTAL API
  */
  static get AxiosServiceSupplierPortal() {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_DEV_SUPPLIER_PORTAL
        : process.env.NEXT_PUBLIC_API_LOCAL_SUPPLIER_PORTAL;
    return this.createAxiosInstance(baseUrl);
  }
}

export default AxiosService;
