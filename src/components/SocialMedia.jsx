import {
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";

function SocialMedia() {
  return (
    <section>
      <div className="social-media-link">
        <li>
          <a href="/" target="_blank">
            <FacebookFilled className="social-icon facebook-icon" />
          </a>
        </li>
        <li>
          <a href="/" target="_blank">
            <LinkedinFilled className="social-icon linkedin-icon" />
          </a>
        </li>
        <li>
          <a href="/" target="_blank">
            <YoutubeFilled className="social-icon youtube-icon" />
          </a>
        </li>
        <li>
          <a href="/" target="_blank">
            <InstagramFilled className="social-icon instagram-icon" />
          </a>
        </li>
      </div>
    </section>
  );
}

export default SocialMedia;
