export interface Root {
    location: Location;
    current: Current;
    forecast: Forecast;
}

export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

export interface Current {
    temp_c: number;
    condition: Condition;
    uv: number;
}

export interface Condition {
    text: string;
    icon: string;
}

export interface Forecast {
    forecastday: Forecastday[];
}

export interface Forecastday {
    date: string;
    date_epoch: number;
    day: Day;
    astro: Astro;
    hour: Hour[];
}

export interface Day {
    avgtemp_c: number;
    totalsnow_cm: number;
    condition: Condition2;
}

export interface Condition2 {
    text: string;
    icon: string;
}

export interface Astro {}

export interface Hour {
    condition: Condition3;
}

export interface Condition3 {}
