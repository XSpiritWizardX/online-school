import "./CourseList.css";

function CourseList() {










  return (
    <div className="c-courses-page-container">


        <div className="c-courses-header">
          <h1>ALL COURSES</h1>

        </div>
        <div
        className="course-list-header"
        >
            <h3
            className="course-list-header-title"
            >
            Filter By:
            </h3>
            <button>categories</button>
            <button>grade level</button>
            <button>state</button>
            <button>price</button>
            <button>rating</button>
        </div>

        <div
        className="courses-container"
        >

            {/*
                CARD CONTENTS
                --image
                --title
                --decription
                --degree or certificate offered upon completion
                -- price  -- rating
            */}
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753829297/4264a4ba598c17ef23685260a13bd849_hrz3sk.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                        Intro To Calculus I
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1754453937/giphy_1_evdph0.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                       Advanced Javascript Part IV
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753825880/source_mve9ni.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                       Music Thoery & Practice I
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1754454261/source_1_q84bnw.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                      Art II
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1752609880/vB6eCf_f7yfgb.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                       Michigan Fourth Grade Math
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            FREE
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1752609880/vB6eCf_f7yfgb.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                       Michigan Fourth Grade Reading
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            FREE
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1752609880/vB6eCf_f7yfgb.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                      Michigan Fourth Grade Writing
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            FREE
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1752609880/vB6eCf_f7yfgb.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                         Michigan Fourth Grade Social Studies
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            FREE
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1752609880/vB6eCf_f7yfgb.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                        Michigan Fourth Grade Science
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            FREE
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753825199/k4uuoEPeH0i40XODPsM9--0--vblfc_i68bhj.jpg"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                        Intro To Robotics I
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753825199/k4uuoEPeH0i40XODPsM9--0--vblfc_i68bhj.jpg"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                        Intro To Robotics II
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753825199/k4uuoEPeH0i40XODPsM9--0--vblfc_i68bhj.jpg"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                        Intro To Robotics III
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753829297/4264a4ba598c17ef23685260a13bd849_hrz3sk.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                        Algebra I
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753829297/4264a4ba598c17ef23685260a13bd849_hrz3sk.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                        Algebra II
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="course-card-outside"
            >
                <div
                className="course-card"
                >
                    <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753826922/giphy_n0wqlc.gif"
                    className="course-card-img"
                    />
                    <h3
                    className="course-title"
                    >
                        Astronomy I
                    </h3>
                    <p
                    className="course-desc"
                    >
                        Description for the course . It could even be more than a sentence you know ? Even if it overflows, just let it overflow then i can fix it with css
                    </p>
                    <button
                    className="upon-complete-button"
                    >
                        upon completion
                        </button>
                    <div
                    className="price-rating-container"
                    >
                        <p
                        className="course-price"
                        >
                            $100.00
                        </p>
                        <p
                        className="course-rating"
                        >
                            rating: 3.5 stars
                        </p>
                    </div>
                </div>
            </div>






        </div>
    </div>
  );
}

export default CourseList;
