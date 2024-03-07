"use client";
import SectionHeader from "../Common/SectionHeader";
import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import {
	getFirestore,
	collection,
	where,
	query,
	getDocs,
	or,
	doc,
	updateDoc,
	getDoc,
} from "firebase/firestore";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { app, auth } from "app/(site)/firebase";
import { motion } from "framer-motion";

// Include user in the dependency array to re-run the effect when user changes
import { UserAuth } from "app/context/AuthContext.js";

const Testimonial = () => {
	const { user } = UserAuth();

	const [loading, setLoading] = useState(false);
	const [poseData, setPosesData] = useState([]);

	const db = getFirestore(app);
	useEffect(() => {
		// Ensure user object exists before proceeding
		if (!user) {
			return; // Exit early if user object is null
		}

		const fetchData = async () => {
			try {
				const docRef = doc(db, "users", user.uid);
				const docSnapshot = await getDoc(docRef);
				const posesCollection = collection(db, "yogaPose");
				const q = query(
					posesCollection,
					or(
						where(
							"diseases",
							"array-contains-any",
							docSnapshot?.data()?.diseases
						),
						where(
							"painAreas",
							"array-contains-any",
							docSnapshot?.data()?.painAreas
						),
						where("Aim", "array-contains-any", docSnapshot?.data()?.motive)
					)
				);
				const querySnapshot = await getDocs(q);
				const matchingPosesData = querySnapshot.docs.map((doc) => doc.data());
				setPosesData(matchingPosesData);
				console.log(matchingPosesData);
				// console.log(poseData.length);
			} catch (error) {
				console.error(error);
				console.log("error caught");
			}
		};

		// Set loading state to true while fetching data
		setLoading(true);

		fetchData().then(() => {
			// After data fetching is complete, set loading state to false
			setLoading(false);
		});
	}, [user]);

	const posesData = [
		{
			Name: "T Pose",
			photoURL:
				"https://preview.free3d.com/img/2020/07/2399392636998780345/ni8pdb84.jpg",
			description:
				"In this pose, the arms are stretched out horizontally to the sides, forming a straight line with the torso, while the feet are placed firmly on the ground. The T-pose is known for its ability to promote balance, alignment, and stability throughout the body. It can help strengthen the core, improve posture, and increase flexibility in the shoulders and chest.",
			benefits: [
				"Holding the T-pose and focusing on deep breathing can help calm the mind and reduce stress and anxiety.",
				"The expansive nature of the T-pose encourages better circulation throughout the body.",
				"By extending the arms out to the sides and keeping the spine straight, the T-pose helps align the shoulders, spine, and hips, promoting better posture.",
			],
		},
		{
			Name: "Back Bend",
			photoURL: "https://pocketyoga.com/assets/images/full/MountainArmsUp.png",
			description:
				"Stand with feet hip-width apart, lift arms overhead, and arch your upper back while exhaling. Open your chest, gaze upwards, and maintain active legs. Hold for a few breaths, reaching hands towards the floor if comfortable. To exit, engage your core and slowly return to an upright position",
			benefits: [
				"It slowly helps in stimulating the internal organs leading to an improved digestion.",
				"It improves the flexibility of the hips and lower back.",
				"This stretching improves the functioning of the lungs reducing any respiratory disorders.",
			],
		},
		{
			Name: "Toe Touch",
			photoURL:
				"https://t3.ftcdn.net/jpg/02/53/35/80/360_F_253358090_cQPRo5XDpYZ2qqxk0kQPQYdyjLtcVqAx.jpg",
			description:
				"Start by standing with your feet hip-width apart. Take a deep breath in and as you exhale, hinge at your hips and bend forward from your waist. Keep your back straight as you reach your hands toward your toes. If you can, allow your fingertips or palms to touch the floor. If not, go as far as your flexibility allows. Hold the stretch for a few breaths, continuing to deepen the stretch with each exhale. To come out of the pose, engage your core muscles, bend your knees slightly, and slowly roll up to a standing position, stacking each vertebra.",
			benefits: [
				"Stretching the back of the legs and spine enhances blood flow, contributing to better circulation throughout the body.",
				"The forward bend promotes relaxation, calms the mind, and helps reduce stress and anxiety.",
				"The compression of the abdomen in this pose may aid digestion by stimulating the digestive organs.",
			],
		},
	];
	return (
		<>
			<section>
				<div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 mt-5">
					{/* <!-- Section Title Start --> */}
					<div className="animate_top mx-auto text-center">
						<SectionHeader
							headerInfo={{
								title: `Recommendations`,
								subtitle: `Recommended For You!`,
								description: ``,
							}}
						/>
					</div>
					{/* <!-- Section Title End --> */}
				</div>

				<motion.div
					variants={{
						hidden: {
							opacity: 0,
							y: -20,
						},

						visible: {
							opacity: 1,
							y: 0,
						},
					}}
					initial="hidden"
					whileInView="visible"
					transition={{ duration: 1, delay: 0.1 }}
					viewport={{ once: true }}
					className="animate_top mx-auto mt-15 max-w-c-1235 px-4 md:px-8 xl:mt-10 xl:px-0"
				>
					{/* <!-- Slider main container --> */}
					<div className="flex items-center swiper testimonial-01 mb-20 pb-22.5">
						{/* <!-- Additional required wrapper --> */}
						<Swiper
							spaceBetween={50}
							slidesPerView={2}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							pagination={{
								clickable: true,
							}}
							modules={[Autoplay, Pagination]}
							breakpoints={{
								// when window width is >= 640px
								0: {
									slidesPerView: 1,
								},
								// when window width is >= 768px
								768: {
									slidesPerView: 2,
								},
							}}
						>
							{poseData.map((pose, index) => (
								<SwiperSlide key={index}>
									{/* <SingleTestimonial review={pose} /> */}
									<div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
										<div className="mb-7.5 border-b border-stroke pb-6 dark:border-strokedark items-start text-justify gap-4">
											<img
												style={{ width: "60%", height: "50%", float: "right", margin: "10px" }}
												className=""
												src={pose.photoURL}
											/>
											<div>
												<h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
													<strong>{pose.Name}</strong>
												</h3>
												<ul>
													{pose.benefits.map((benefit, index) => (
														<li key={index}>{`${index + 1}. ${benefit}`}</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
							{posesData.map((pose, index) => (
								<SwiperSlide key={index}>
									<div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
										<div className="mb-7.5 border-b border-stroke pb-6 dark:border-strokedark items-start text-justify gap-4">
											<div>
												<img
													style={{ width: "60%", height: "50%", float: "right", margin: "10px" }}
													className=""
													src={pose.photoURL}
												/>
												<h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
													<strong>{pose.Name}</strong>
												</h3>
												<ul>
													{pose.benefits.map((benefit, index) => (
														<li key={index}>{`${index + 1}. ${benefit}`}</li>
													))}
												</ul>
											</div>

										</div>
										{/* <p>{content}</p> */}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</motion.div>
			</section>
		</>
	);
};

export default Testimonial;
