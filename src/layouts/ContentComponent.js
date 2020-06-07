import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import EventsView from '../pages/events/EventsView';
import MainView from '../pages/main/MainView';
import RadioStationsView from '../pages/radioStations/RadioStationsView';
import RadioStationSongsView from '../pages/radioStations/songs/RadioStationSongsView';
import RadioStationStreamsView from '../pages/radioStations/streams/RadioStationStreamsView';
import StreamUrlsView from '../pages/radioStations/streams/urls/StreamUrlsView';
import SongsView from '../pages/songs/SongsView';
import { EVENTS, HOME, RADIO_STATIONS, RADIO_STATION_SONGS, RADIO_STATION_STREAMS, RADIO_STATION_STREAM_URLS, SONGS } from './pathTypes';

export default () => (
    <Layout.Content
        style={{
            margin: 10,
            padding: 10,
            background: '#fff',
            minHeight: 280,
        }}
    >
        <Switch>
            <Route exact path={HOME}>
                <MainView />
            </Route>
            <Route exact path={RADIO_STATIONS}>
                <RadioStationsView />
            </Route>
            <Route exact path={RADIO_STATION_STREAMS}>
                <RadioStationStreamsView />
            </Route>
            <Route exact path={RADIO_STATION_SONGS}>
                <RadioStationSongsView />
            </Route>
            <Route exact path={RADIO_STATION_STREAM_URLS}>
                <StreamUrlsView />
            </Route>
            <Route exact path={SONGS}>
                <SongsView />
            </Route>
            <Route exact path={EVENTS}>
                <EventsView />
            </Route>
        </Switch>
    </Layout.Content >
);;