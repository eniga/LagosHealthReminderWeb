import { Injectable } from "@angular/core";

@Injectable()

export class SettingsModel {
    settingsId: number;
    name: string;
    value: string;
}