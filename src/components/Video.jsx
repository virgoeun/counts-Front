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

      myVideo3.resize(fill().width(500).height(300)
      .gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) // Crop the video, focusing on the faces.
      .roundCorners(byRadius(20))  // Round the corners.

      return (
        <div>
        <h3 className="mt-5">Today's Count Snack for you 🍿</h3>
        <p className="mb-5 mt-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Today's Counts Move is with Yoga instructor Daniel! She will guide us on how to release back pain step by step. If you are interested in her program, please check our MOVE Program Page!
        </p>
        <div className="d-flex justify-content-center">
          <div className="card text-center" style={{ width: "700px" }}>
            <div className="card-body">
              <AdvancedVideo cldVid={myVideo3} controls />
            </div>
          </div>
        </div>
      </div>
      )
    };
export default Videos;
