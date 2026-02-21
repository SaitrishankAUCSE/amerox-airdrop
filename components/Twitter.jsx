import React, { useState } from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

const Twitter = ({ handleClick, user }) => {
  return (
    <>
      <div className="input-group-new">
        <label className="label-new">Post URL</label>
        <input
          onChange={handleClick}
          className="input-new"
          type="text"
          value={user.twitterId || ''}
          placeholder="Paste Tweet URL"
        />
        <div></div>
      </div>

      {user.twitterId && (
        <div style={{ marginTop: '1rem' }}>
          <TwitterTweetEmbed tweetId={user?.twitterId} />
        </div>
      )}

      {/* <div className="custom-width ">
        <img src="token.png" alt="" />
        <h4>Kindly do the following steps:</h4>
        <TwitterShareButton
          url={"https://twitter.com/TheBCoders/status/1753257564899545178/"}
          options={{ text: "Limited airdrop", via: "TheBCoders", height: 400 }}
        />
        <TwitterFollowButton screenName={"TheBCoders"} />
        <TwitterHashtagButton tag={"TheBCoders"} />
      </div> */}
    </>
  );
};

export default Twitter;
