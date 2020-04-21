export const HOME = '/';
export const RADIO_STATIONS = '/radio-stations';
export const SONGS = '/songs';
export const EVENTS = '/events';
export const RADIO_STATION_STREAMS = '/radio-stations/:radioStationId/streams';
export const RADIO_STATION_STREAM_URLS = '/radio-stations/:radioStationId/streams/:streamId/urls';
export const RADIO_STATION_SONGS = '/radio-stations/:radioStationId/songs';

export const createURLRadioStationStreams = (radioStationId) => {
    return RADIO_STATION_STREAMS.replace(':radioStationId', radioStationId);
}

export const createURLRadioStationSongs = (radioStationId) => {
    return RADIO_STATION_SONGS.replace(':radioStationId', radioStationId);
}

export const createURLStreamUrls = (radioStationId, streamId) => {
    return RADIO_STATION_STREAM_URLS
        .replace(':radioStationId', radioStationId)
        .replace(':streamId', streamId);
}