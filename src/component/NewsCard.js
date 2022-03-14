import React from "react";

export default function NewsCard(Props) {
	let { newsTitle, imgUrl, readMore, author, date, sorcename, newsDescription } = Props;
	return (
		<>
			<div className="card card-blur-lg">
				<span className="source badge rounded-pill bg-danger">{sorcename}</span>
				<img src={imgUrl} className="card-img-top image-size" alt="..." />
				<div className="card-body">
					<h5 className="card-title news-title w-100 text-start">{newsTitle}</h5>
					<p className="card-text text-start">
						<small className="text-white fw-light">
							By{" "}
							<strong className="fw-bold text-decoration-underline">{author}</strong>{" "}
							On <strong className="fw-bold ">{date}</strong>
						</small>
					</p>
					<p className="card-text news-desc w-100 text-start">{newsDescription}</p>
					<a href={readMore} className="btn btn-sm btn-light text-end">
						Read More
					</a>
				</div>
			</div>
		</>
	);
}