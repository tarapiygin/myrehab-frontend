import {
  MailruShareButton,
  MailruIcon,
  FacebookShareButton,
  FacebookIcon,
  OKShareButton,
  OKIcon,
  TelegramShareButton,
  TelegramIcon,
  ViberShareButton,
  ViberIcon,
  VKShareButton,
  VKIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

import styles from './ShareButtons.module.css';

export default function ShareButtons({ url }) {
  return (
  <div className={styles.shareButtons}>
  <MailruShareButton
  url={url}
  children={<MailruIcon size={32} round={true} />}
  />
  <OKShareButton
  url={url}
  children={<OKIcon size={32} round={true} />}
  />
  <TelegramShareButton
  url={url}
  children={<TelegramIcon size={32} round={true} />}
  />
  <ViberShareButton
  url={url}
  children={<ViberIcon size={32} round={true} />}
  />
  <FacebookShareButton
  url={url}
  children ={<FacebookIcon size={32} round={true}/>}
  />
  <VKShareButton
  url={url}
  children={<VKIcon size={32} round={true} />}/>
  <WhatsappShareButton
  url={url}
  children={<WhatsappIcon size={32} round={true} />}
  />
</div>
  );
}
