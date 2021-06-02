import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DestinationObjectOptions, Logger, LoggerOptions } from 'pino';
import { IAxiosCacheAdapterOptions, setup } from 'axios-cache-adapter';
import { BaseURL } from '../constants';
import {
  createLogger,
  handleRequest,
  handleRequestError,
  handleResponse,
  handleResponseError,
} from '../config/logger';

/**
 * ## Client Args
 * Used to pass optional configuration for logging and cache to the clients.
 */
export interface ClientArgs {
  /**
   * ## Logger Options
   * Options for the client logger.
   * @see https://getpino.io/#/docs/api?id=options
   */
  logOptions?: LoggerOptions;
  /**
   * ## Logger Destination Options
   * Options for the client logger.
   * @see https://getpino.io/#/docs/api?id=destination
   */
  logDestination?: DestinationObjectOptions;
  /**
   * ## Axios Cache Options
   * Options for cache.
   * @see https://github.com/RasCarlito/axios-cache-adapter
   */
  cacheOptions?: IAxiosCacheAdapterOptions;
}

/**
 * ### Base Client
 */
export class BaseClient {
  protected api: AxiosInstance;

  protected logger: Logger;

  /**
   *
   */
  constructor(clientOptions?: ClientArgs) {
    this.api = setup({
      baseURL: BaseURL.REST,
      headers: {
        'Content-Type': 'application/json',
      },
      cache: {
        maxAge: clientOptions?.cacheOptions ? clientOptions.cacheOptions.maxAge : 0,
        ...clientOptions?.cacheOptions,
      },
    });

    this.logger = createLogger(
      {
        enabled: !(
          clientOptions?.logOptions?.enabled === undefined ||
          clientOptions?.logOptions.enabled === false
        ),
        ...clientOptions?.logOptions,
      },
      clientOptions?.logDestination
    );

    this.api.interceptors.request.use(
      (config: AxiosRequestConfig) => handleRequest(config, this.logger),
      (error: AxiosError<string>) => handleRequestError(error, this.logger)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => handleResponse(response, this.logger),
      (error: AxiosError<string>) => handleResponseError(error, this.logger)
    );
  }
}
