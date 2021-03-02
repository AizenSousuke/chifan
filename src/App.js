import { motion, useAnimation } from "framer-motion";
import { useState, useRef } from "react";
import "./App.css";
import confetti from "canvas-confetti";

function App() {
	const [results, setResults] = useState(null);

	const places = [
		"Circuit Road",
		"Joo Seng",
		"Muslim Delights",
		"Golden",
		"Thai",
		"Western",
		"Macdonald's",
		"Old Chang Kee",
		"Julaiha",
	];

	const resultContainer = useAnimation();
  const resultParagraph = useRef();

	const randomInRange = (min, max) => {
		return Math.random() * (max - min) + min;
	};

  const randomHex = () => {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  };


	const randomize = () => {
		setResults(places[Math.floor(Math.random() * places.length)]);
		resultContainer.start({ y: [30, -20, 0], opacity: [0, 1] });
		resultContainer.start({
			scale: [1, 1.1, 1],
			repeatCount: 2,
			transition: { repeat: Infinity, duration: 1.5 },
		});
		confetti({
			angle: randomInRange(55, 125),
			spread: randomInRange(50, 70),
			particleCount: randomInRange(50, 100),
			origin: { y: 0.7, x: 0.5 },
      zIndex: 100
		});
    resultParagraph.current.style.color = randomHex();
	};

	return (
		<>
			<div className="App-header">
				<motion.div
					animate={resultContainer}
					transition={{
						type: "spring",
						damping: 10,
						mass: 0.75,
						duration: 0.5,
					}}
					// layout
				>
					<p ref={resultParagraph} style={{textShadow: "0.5px 1px 5px black"}}>{results ?? ""}</p>
				</motion.div>
			</div>
			<div className="App-body">
				<h1 className="pb-5">
					Where are we{" "}
					<u
						style={{
							textDecorationColor: "red",
							textDecorationThickness: 10,
						}}
						className="text-yellow-300"
					>
						eating
					</u>{" "}
					today?
				</h1>
				<div className="text-base pb-3">我们想在哪里吃饭?</div>
				<motion.div
					initial={{ y: -20 }}
					animate={{ y: 0 }}
					whileTap={{ scale: 1.1 }}
					whileHover={{ scale: 1.05 }}
				>
					<button
						className="text-green-500 pl-5 pr-5 rounded-full capitalize bg-yellow-100"
						onClick={() => randomize()}
					>
						Click me
					</button>
				</motion.div>
			</div>
		</>
	);
}

export default App;
