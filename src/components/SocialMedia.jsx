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
          <a
            href="https://www.facebook.com/profile.php?id=61557285422857"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookFilled className="social-icon facebook-icon" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/gismapslayers/about/?viewAsMember=true"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinFilled className="social-icon linkedin-icon" />
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=Czl5aF3d5lg"
            target="_blank"
            rel="noreferrer"
          >
            <YoutubeFilled className="social-icon youtube-icon" />
          </a>
        </li>
      </div>
    </section>
  );
}

export default SocialMedia;
