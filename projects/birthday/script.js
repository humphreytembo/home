const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sparks = [];

function createSparks(x, y) {
  for (let i = 0; i < 50; i++) {
    sparks.push({
      x: x,
      y: y,
      radius: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8,
      life: 100
    });
  }
}

function animateSparks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparks.forEach((spark, index) => {
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
    ctx.fillStyle = spark.color;
    ctx.fill();
    spark.x += spark.dx;
    spark.y += spark.dy;
    spark.life--;
    if (spark.life <= 0) {
      sparks.splice(index, 1);
    }
  });
  requestAnimationFrame(animateSparks);
}

document.getElementById("sparkButton").addEventListener("click", (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  createSparks(x, y);
});

animateSparks();
