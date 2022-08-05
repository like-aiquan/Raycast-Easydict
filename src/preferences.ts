/*
 * @author: tisfeng
 * @createTime: 2022-08-05 10:36
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-08-06 01:37
 * @fileName: preferences.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { environment, getPreferenceValues } from "@raycast/api";
import CryptoJS from "crypto-js";
import { getLanguageItemFromYoudaoId } from "./language/languages";

export const myPreferences: MyPreferences = getPreferenceValues();
export const preferrdLanguage1 = getLanguageItemFromYoudaoId(myPreferences.language1);
export const preferrdLanguage2 = getLanguageItemFromYoudaoId(myPreferences.language2);
export const preferrdLanguages = [preferrdLanguage1, preferrdLanguage2];
// console.log("myPreferences: ", myPreferences);

export interface MyPreferences {
  language1: string;
  language2: string;
  enableAutomaticQuerySelectedText: boolean;
  enableAutomaticPlayWordAudio: boolean;
  enableDisplayTargetTranslationLanguage: boolean;
  translationOrder: string;
  enableOpenInEudic: boolean;
  enableSystemProxy: boolean;

  enableYoudaoDictionary: boolean;
  enableYoudaoTranslate: boolean;

  enableLingueeDictionary: boolean;

  youdaoAppId: string;
  youdaoAppSecret: string;

  enableDeepLTranslate: boolean;
  deepLAuthKey: string;

  enableGoogleTranslate: boolean;

  enableBaiduTranslate: boolean;
  baiduAppId: string;
  baiduAppSecret: string;

  enableTencentTranslate: boolean;
  tencentSecretId: string;
  tencentSecretKey: string;

  enableAppleLanguageDetect: boolean;
  enableAppleTranslate: boolean;

  enableCaiyunTranslate: boolean;
  caiyunToken: string;
}

/**
 * Service keys.
 *
 * * NOTE: Please apply for your own keys as much as possible. Please do not abuse them, otherwise I have to revoke them 😑。
 */
export class KeyStore {
  private static defaultEncrytedYoudaoAppId = "U2FsdGVkX19SpBCGxMeYKP0iS1PWKmvPeqIYNaZjAZC142Y5pLrOskw0gqHGpVS1";
  private static defaultEncrytedYoudaoAppKey =
    "U2FsdGVkX1/JF2ZMngmTw8Vm+P0pHWmHKLQhGpUtYiDc0kLZl6FKw1Vn3hMyl7iL7owwReGJCLsovDxztZKb9g==";
  private static defaultYoudaoAppId = myDecrypt(this.defaultEncrytedYoudaoAppId);
  private static defaultYoudaoAppSecret = myDecrypt(this.defaultEncrytedYoudaoAppKey);

  private static defaultEncryptedBaiduAppId = "U2FsdGVkX1/QHkSw+8qxr99vLkSasBfBRmA6Kb5nMyjP8IJazM9DcOpd3cOY6/il";
  private static defaultEncryptedBaiduAppSecret = "U2FsdGVkX1+a2LbZ0+jntJTQjpPKUNWGrlr4NSBOwmlah7iP+w2gefq1UpCan39J";
  private static defaultBaiduAppId = myDecrypt(this.defaultEncryptedBaiduAppId);
  private static defaultBaiduAppSecret = myDecrypt(this.defaultEncryptedBaiduAppSecret);

  private static defaultEncryptedTencentSecretId =
    "U2FsdGVkX19lHBVXE+CEZI9cENSToLIGzHDsUIE+RyvIC66rgxumDmpYPDY4MdaTSbrq7MIyDvtgXaLvzijYSg==";
  private static defaultEncryptedTencentSecretKey =
    "U2FsdGVkX1+N6wDYXNiUISwKOM97cY03RjXmC+0+iodFo3b4NTNC1J8RR6xqcbdyF7z3Z2yQRMHHxn4m02aUvA==";
  private static defaultTencentSecretId = myDecrypt(this.defaultEncryptedTencentSecretId);
  private static defaultTencentSecretKey = myDecrypt(this.defaultEncryptedTencentSecretKey);

  /**
   * This deepl key is from Github, we do not guarantee that it will work all the time.
   * https://github.com/search?p=1&q=deepl+key+%3Afx&type=Code
   */
  static defaultEncryptedDeepLAuthKey =
    "U2FsdGVkX1/ydx7tUqDRvfQICbuHbPOrkevlP70vUAYtgYL3YjLDge2FR6alqKZu2ybNlXJig3PIfDdBFGvVjg==";
  private static defaultDeepLAuthKey = myDecrypt(this.defaultEncryptedDeepLAuthKey);

  private static defaultEncryptedCaiyunToken = "U2FsdGVkX1+ihWvHkAfPMrWHju5Kg4EXAm1AVbXazEeHaXE1jdeUzZZrhjdKmS6u";
  private static defaultCaiyunToken = myDecrypt(this.defaultEncryptedCaiyunToken);

  // youdao app id and appsecret
  static youdaoAppId =
    myPreferences.youdaoAppId.trim().length > 0 ? myPreferences.youdaoAppId.trim() : this.defaultYoudaoAppId;
  static youdaoAppSecret =
    myPreferences.youdaoAppSecret.trim().length > 0
      ? myPreferences.youdaoAppSecret.trim()
      : this.defaultYoudaoAppSecret;

  // baidu app id and secret
  static baiduAppId =
    myPreferences.baiduAppId.trim().length > 0 ? myPreferences.baiduAppId.trim() : this.defaultBaiduAppId;
  static baiduAppSecret =
    myPreferences.baiduAppSecret.trim().length > 0 ? myPreferences.baiduAppSecret.trim() : this.defaultBaiduAppSecret;

  // tencent secret id and key
  static tencentSecretId =
    myPreferences.tencentSecretId.trim().length > 0
      ? myPreferences.tencentSecretId.trim()
      : this.defaultTencentSecretId;
  static tencentSecretKey =
    myPreferences.tencentSecretKey.trim().length > 0
      ? myPreferences.tencentSecretKey.trim()
      : this.defaultTencentSecretKey;

  static deepLAuthKey =
    myPreferences.deepLAuthKey.trim().length > 0 ? myPreferences.deepLAuthKey.trim() : this.defaultDeepLAuthKey;

  static caiyunToken =
    myPreferences.caiyunToken.trim().length > 0 ? myPreferences.caiyunToken.trim() : this.defaultCaiyunToken;
}

export function myDecrypt(ciphertext: string) {
  // console.warn("decrypt:", ciphertext);
  const bytes = CryptoJS.AES.decrypt(ciphertext, environment.extensionName);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  // console.warn("originalText: ", originalText);
  return originalText;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function myEncrypt(text: string) {
  // console.warn("encrypt:", text);
  const ciphertext = CryptoJS.AES.encrypt(text, environment.extensionName).toString();
  // console.warn("ciphertext: ", ciphertext);
  return ciphertext;
}
