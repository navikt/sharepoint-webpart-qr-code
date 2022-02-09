import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'QrCodeWebPartStrings';
import QrCode from './components/QrCode';
import { IQrCodeProps } from './components/IQrCodeProps';

export interface IQrCodeWebPartProps {
  url: string;
  text: string;
}

export default class QrCodeWebPart extends BaseClientSideWebPart<IQrCodeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQrCodeProps> = React.createElement(
      QrCode,
      {
        url: this.properties.url,
        text: this.properties.text,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: '',
              groupFields: [
                PropertyPaneTextField('url', {
                  label: strings.UrlFieldLabel
                }),
                PropertyPaneTextField('text', {
                  label: strings.TextFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
