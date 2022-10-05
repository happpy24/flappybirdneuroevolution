
function nextGeneration() {
	calculateFitness();
	
	for (let i = 0; i < TOTAL; i++) {
		birds[i] = pickOne();
	}
	savedBirds = [];
}

function pickOne() {
	let child = random(savedBirds);	
	child.mutate(0.1);
	return child;
}

function calculateFitness() {
	let sum = 0;
	for (let bird of birds) {
		sum += bird.score;
	}
	for (let bird of birds) {
		bird.fitness = bird.score / sum;
	}
}