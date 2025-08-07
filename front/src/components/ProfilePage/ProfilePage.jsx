import { useSelector } from "react-redux";
import "./ProfilePage.css";
import Garden from "./Garden/Garden";
function ProfilePage() {
  const user = useSelector((state) => state.session.user);










  return (
    <div className="profile-page-container">
      <div className="profile-page-top">
        <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753828141/0287d3ba8b3330fca99f69e2001d3168_kgsgge.gif" className="profile-backtop-img"/>
          <img
            src={user?.avatar_url || "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603633/fj2ECSAhOa96TO14MCLV--1--ra4jt-removebg-preview_iqvfvq.png"}
            className="pro-img"
          />
        <div className="avatar-section">
        <div className="profile-header">
            <h2
            className="progress-item"
            >Followers: 19.4K</h2>
            <h2
            className="progress-item"
            >Subscribers: 893</h2>
            <h2
            className="progress-item"
            >Student Rating: 4.5 stars</h2>
            <h2
            className="progress-item"
            >Creator Rating: 2.5 stars</h2>
        </div>
        </div>
      </div>
      <span
      className="spanner"></span>
      <div className="profile-page-content">
        {/* map through achievements when a user collects one. */}
      <div className="trophies" >
        <h1>Trophies</h1>
        <p
        className="trophy"
        >This would be a trophy</p>
        <p
        className="trophy"
        >This would be a trophy</p>
        <p
        className="trophy"
        >This would be a trophy</p>
        <p
        className="trophy"
        >This would be a trophy</p>
        <p
        className="trophy"
        >This would be a trophy</p>
        <p
        className="trophy"
        >This would be a trophy</p>
        <p
        className="trophy"
        >This would be a trophy</p>
      </div>





        <div className="content-and-bio">
    <h2>BIO</h2>
        <div
        className="profile-video"
        >
            {/* example hard coded video for uuser profiles

            */}


                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/vHdclsdkp28?si=oPKMdbt8j75PB3xO" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        </div>
        {/* Where actual {user.bio} starts */}
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quibusdam voluptatum aspernatur ex cum sequi sint ratione est veritatis perspiciatis. Dolorum optio beatae quia dolor est ex quae vero
        </p>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quibusdam voluptatum aspernatur ex cum sequi sint ratione est veritatis perspiciatis. Dolorum optio beatae quia dolor est ex quae vero ducimus.
        </p>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quibusdam voluptatum aspernatur ex cum sequi sint ratione est veritatis perspiciatis. Dolorum optio beatae quia dolor est ex quae vero ducimus.
        </p>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quibusdam voluptatum aspernatur ex cum sequi sint ratione est veritatis perspiciatis. Dolorum optio beatae quia dolor est ex quae vero ducimus.
        </p>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quibusdam voluptatum aspernatur ex cum sequi sint ratione est veritatis perspiciatis. Dolorum optio beatae quia dolor est ex quae vero ducimus.
        </p>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quibusdam voluptatum aspernatur ex cum sequi sint ratione est veritatis perspiciatis. Dolorum optio beatae quia dolor est ex quae vero ducimus.
        </p>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quibusdam voluptatum aspernatur ex cum sequi sint ratione est veritatis perspiciatis. Dolorum optio beatae quia dolor est ex quae vero ducimus.
        </p>
        </div>



      </div>
              <span
              className="profile-page-seperator"
              >

              </span>



              <div
                className="profile-info-section"
              >
                <div
                   className="profile-info-header"
                >
                  <p
                  className="pro-info"
                  >degrees</p>
                  <p
                  className="pro-info"
                  >certificates</p>
                  <p
                  className="pro-info"
                  >licenses</p>
                  <p
                  className="pro-info"
                  >images</p>
                  <p
                  className="pro-info"
                  >videos</p>
                  <p
                  className="pro-info"
                  >ratings</p>
                  <p
                  className="pro-info"
                  >created courses</p>
                </div>



              <div
                className="info-body"
              >
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse iusto at sint. Enim excepturi facilis fuga adipisci odio et natus, culpa repudiandae cum dignissimos possimus hic, minus quia odit!</p>
              </div>







              </div>

    </div>
  );
}

export default ProfilePage;
