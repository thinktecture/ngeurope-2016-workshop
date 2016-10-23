import {Injectable} from '@angular/core';
import {IBoardZAppWindow} from '../interfaces/boardzAppWindow';

declare var window: IBoardZAppWindow;

@Injectable()
export class NativeIntegrationService {

    constructor() { }

}
