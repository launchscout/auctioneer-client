/* globals describe, it */
import "reflect-metadata";
import {expect} from "chai";
import {Http} from "angular2/http";
import PhoenixChannels from "angular2-phoenix-channels";
import ThingService from "./thing_service";
import td from "testdouble/testdouble.js";

describe('it', () => {
  let httpMock = td.object(Http);
  let phoenixChannelsMock = td.object(["channel"]);
  let thingService = new ThingService(httpMock, phoenixChannelsMock);
  it('should work', () => {
    expect(2 + 2).to.equal(4);
  });
});
