import * as React from 'react';
import { IQrCodeProps } from './IQrCodeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import QRCode from 'qrcode';
import { Link} from '@fluentui/react/lib/Link';

export interface IQrCodeState {
  qrcode?: string;
}

export default class QrCode extends React.Component<IQrCodeProps, {qrcode}> {

  public constructor(props: IQrCodeProps) {
    super(props);
    this.state = {
      qrcode: null,
    };
  }

  public componentDidMount() {
    const {url} = this.props;
    this._update_qr(url);
  }

  public componentDidUpdate(prevProps: IQrCodeProps, prevState: IQrCodeState) {
    const {url} = this.props;
    if(url != prevProps.url) this._update_qr(url);
  }

  public render(): React.ReactElement<IQrCodeProps> {
    const {url, text} = this.props;
    const {qrcode} = this.state;
    return (
      <div style={{width:'100%'}}>
        <Link href={url} style={{display: 'block', width:'100%', textAlign: 'center'}}>
          <img style={{display:'block', width:'100%', height:'auto', maxWidth: 130, margin: '0 auto'}} src={qrcode} alt=""/>
          <span>{escape(text)}</span>
        </Link>
      </div>
    );
  }

  private async _update_qr(url) {
    try {
      const qrcode = await QRCode.toDataURL(url || window.location.href);
      this.setState({qrcode});
    } catch (err) {
      console.error(err);
    }
  }
}
