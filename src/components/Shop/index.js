import React, { Component } from "react";
import * as analytics from "./../../analytics/analytics";
import Loader from "./../Common/Loader";

const ShopPage = (props) => {
  let mainDivStyle = {
    margin: "15px",
  };

  const iframestyle = {
    width: "120px",
    height: "240px",
    margin: "5px",
  };
  return (
    <div style={mainDivStyle}>
      <script async type="text/javascript">
        amzn_assoc_ad_type ="responsive_search_widget"; amzn_assoc_tracking_id
        ="expensemana0c-21"; amzn_assoc_marketplace ="amazon"; amzn_assoc_region
        ="IN"; amzn_assoc_placement =""; amzn_assoc_search_type =
        "search_widget";amzn_assoc_width ="auto"; amzn_assoc_height ="auto";
        amzn_assoc_default_search_category =""; amzn_assoc_default_search_key
        ="";amzn_assoc_theme ="light"; amzn_assoc_bg_color ="FFFFFF";{" "}
      </script>
      <script
        async
        src="//z-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1&Marketplace=IN"
      />
      <div>Shop For Below Categories </div>
      <a
        target="_blank"
        href="https://www.amazon.in/b?_encoding=UTF8&tag=expensemana0c-21&linkCode=ur2&linkId=76267c9e2c9e232321bdff5f373a075e&camp=3638&creative=24630&node=976419031"
      >
        Electronics
      </a>
      <div />
      <a
        target="_blank"
        href="https://www.amazon.in/b?_encoding=UTF8&tag=expensemana0c-21&linkCode=ur2&linkId=ba370a0f6dbdc73c7ebaf2ccc2cb2e8d&camp=3638&creative=24630&node=976392031"
      >
        Computers{" "}
      </a>
      <div />
      <a
        target="_blank"
        href="https://www.amazon.in/b?_encoding=UTF8&tag=expensemana0c-21&linkCode=ur2&linkId=4a840d83a4e993ac22555772b08e86f3&camp=3638&creative=24630&node=1571271031"
      >
        Apparel &amp; Accessories
      </a>
      <div />
      <a
        target="_blank"
        href="https://www.amazon.in/b?_encoding=UTF8&tag=expensemana0c-21&linkCode=ur2&linkId=a1896cc181ad435c88a408e3d1926f97&camp=3638&creative=24630&node=976442031"
      >
        Kitchen &amp; Housewares
      </a>
      <div />
      <a
        target="_blank"
        href="https://www.amazon.in/b?_encoding=UTF8&tag=expensemana0c-21&linkCode=ur2&linkId=a10e576ec746460a48b56662c634ceac&camp=3638&creative=24630&node=2454169031"
      >
        Luggage
      </a>
      <div />
      <a
        target="_blank"
        href="https://www.amazon.in/b?_encoding=UTF8&tag=expensemana0c-21&linkCode=ur2&linkId=212b07a74913e2ae3ac412e6f4c127c3&camp=3638&creative=24630&node=1983396031"
      >
        Shoes
      </a>
      <div />
      <a
        target="_blank"
        href="https://www.amazon.in/b?_encoding=UTF8&tag=expensemana0c-21&linkCode=ur2&linkId=a6a05d4c45ecd55c443b07d24ce473e2&camp=3638&creative=24630&node=1984443031"
      >
        Sports And Outdoors
      </a>
      <div> You might Find these products interesting </div>
      <div>
        <iframe
          style={iframestyle}
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          frameborder="0"
          src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ac&ref=tf_til&ad_type=product_link&tracking_id=expensemana0c-21&marketplace=amazon&region=IN&placement=B01LYOSLGO&asins=B01LYOSLGO&linkId=cd3968297968257d801d16047af5b3b1&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
        />
        <iframe
          style={iframestyle}
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          frameborder="0"
          src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ac&ref=tf_til&ad_type=product_link&tracking_id=expensemana0c-21&marketplace=amazon&region=IN&placement=B0756Z43QS&asins=B0756Z43QS&linkId=54a4b2b5daa8dfdb7da13f4411956e9d&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
        />
        <iframe
          style={iframestyle}
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          frameborder="0"
          src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ac&ref=tf_til&ad_type=product_link&tracking_id=expensemana0c-21&marketplace=amazon&region=IN&placement=B07DJL15QT&asins=B07DJL15QT&linkId=f417824e35947729f7c62297e825c424&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
        />
        <iframe
          style={iframestyle}
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          frameborder="0"
          src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ac&ref=tf_til&ad_type=product_link&tracking_id=expensemana0c-21&marketplace=amazon&region=IN&placement=B07HDC419C&asins=B07HDC419C&linkId=7e026fdff898213abf1032c2c4413cd2&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
        />
      </div>
    </div>
  );
};

export default ShopPage;
