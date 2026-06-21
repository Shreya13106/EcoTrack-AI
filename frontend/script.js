let emissionChart;

// ======================
// CARBON CALCULATOR
// ======================

document.getElementById("calculateBtn")
.addEventListener("click", async () => {

    const transport =
        document.getElementById("transport").value;

    const electricity =
        document.getElementById("electricity").value;

    const food =
        document.getElementById("food").value;

    const response = await fetch(
        "https://ecotrack-ai-backend-4sk0.onrender.com/calculate",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                transport,
                electricity,
                food
            })
        }
    );

    const data = await response.json();

    // Results

    document.getElementById("result").innerHTML = `
        <h2>🌱 Results</h2>

        <p>
            🚗 Transport:
            ${data.transport_emission} kg CO₂
        </p>

        <p>
            ⚡ Electricity:
            ${data.electricity_emission} kg CO₂
        </p>

        <p>
            🍽 Food:
            ${data.food_emission} kg CO₂
        </p>

        <hr>

        <h3>
            Total:
            ${data.total_emission} kg CO₂
        </h3>

        <h3>
            Eco Score:
            ${data.eco_score}
        </h3>
    `;

    // Dashboard Cards

    document.getElementById("totalEmissionCard")
    .innerText =
    `${data.total_emission} kg CO₂`;

    document.getElementById("ecoScoreCard")
    .innerText =
    data.eco_score;

    // Chart

    const ctx =
    document.getElementById("emissionChart");

    if(emissionChart){
        emissionChart.destroy();
    }

    emissionChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Transport",
                "Electricity",
                "Food"
            ],

            datasets: [{
                data: [
                    data.transport_emission,
                    data.electricity_emission,
                    data.food_emission
                ]
            }]
        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            }
        }
    });

});


// ======================
// AI ASSISTANT
// ======================

document.getElementById("askAiBtn")
.addEventListener("click", async () => {

    const userQuestion =
    document.getElementById("userQuestion").value;

    const aiResponse =
    document.getElementById("aiResponse");

    aiResponse.innerHTML = "Thinking...";

    try {

        const response = await fetch(
            "https://ecotrack-ai-backend-4sk0.onrender.com/ai",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: userQuestion
                })
            }
        );

        const data = await response.json();

        aiResponse.innerHTML = `
            <h3>🌱 AI Suggestions</h3>
            <p>${data.response}</p>
        `;

    } catch(error){

        aiResponse.innerHTML = `
            <p>AI Assistant Error</p>
        `;

        console.log(error);
    }

});
