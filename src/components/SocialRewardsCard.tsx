import instagramIcon from "../assets/intsagram.png";
import tiktokIcon from "../assets/tiktok.png";
import twitterIcon from "../assets/twitter.png";
import linkedinIcon from "../assets/linkdin.svg";
import youtubeIcon from "../assets/yt.png";

const SocialRewardsCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">
        🎁 Earn More Sepolia ETH
      </h3>
      <p className="text-sm text-center mb-5 text-gray-600">
        Follow us on social platforms and earn up to <strong>+0.10 ETH</strong>
      </p>
      <ul className="space-y-3 p-2">
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <img src={instagramIcon} alt="Instagram" className="h-5 w-5" />
            Instagram
          </span>
          <span className="font-semibold text-green-600">+0.02 ETH</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <img src={tiktokIcon} alt="TikTok" className="h-5 w-5" />
            TikTok
          </span>
          <span className="font-semibold text-green-600">+0.02 ETH</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <img src={twitterIcon} alt="X (Twitter)" className="h-5 w-5" />X
            (Twitter)
          </span>
          <span className="font-semibold text-green-600">+0.02 ETH</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <img src={linkedinIcon} alt="LinkedIn" className="h-5 w-5" />
            LinkedIn
          </span>
          <span className="font-semibold text-green-600">+0.02 ETH</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <img src={youtubeIcon} alt="YouTube" className="h-5 w-5" />
            YouTube
          </span>
          <span className="font-semibold text-green-600">+0.02 ETH</span>
        </li>
      </ul>
    </div>
  );
};

export default SocialRewardsCard;
