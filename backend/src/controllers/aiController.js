const { evaluateJoinAnswer } = require('../service/joinRequestAgent');

const evaluateAnswer = async (req, res) => {
    try {
        const { question, answer, category } = req.body;

        if (!question || !answer || !category) {
            return res.status(400).json({
                success: false,
                message: "Question, answer and category are required"
            });
        }

        const wordCount = answer.trim().split(/\s+/).length;

        if (wordCount < 100 || wordCount > 200) {
            return res.status(400).json({
                success: false,
                message: "Answer must be between 100 and 200 words",
                wordCount
            });
        }

        const evaluation = await evaluateJoinAnswer({
            question,
            answer,
            category
        });

        return res.status(200).json({
            success: true,
            evaluation
        });

    } catch (error) {
        console.error("AI evaluation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to evaluate answer"
        });
    }
};

module.exports = {
    evaluateAnswer
};