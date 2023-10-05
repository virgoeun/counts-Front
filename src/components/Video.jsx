import { Cloudinary } from "@cloudinary/url-gen";
import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

const Videos = () => {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dgslm0j3k'
        }
      });

      const myVideo1 = cld.video('docs/models');
      const myVideo3 = cld.video('docs/yoga');
      const myVideo4 = cld.video('docs/stress');

    const videos = [
        cld.video('docs/models'),
        cld.video('docs/yoga'),
        cld.video('docs/stress')
      ];

      videos.forEach((video) => {
        video
          .resize(fill().width(1080).height(720).gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))))
          .roundCorners(byRadius(20));
      });

      const randomIndex = Math.floor(Math.random() * videos.length);
      const selectedVideo = videos[randomIndex];

      myVideo3.resize(fill().width(700).height(500)
      .gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) // Crop the video, focusing on the faces.
      .roundCorners(byRadius(20))  // Round the corners.

      return (
        <div>
            <h3>Today's Count Snack for you ❤️ </h3>
          <AdvancedVideo cldVid={myVideo3} controls />
        </div>
      )
    };
export default Videos;
