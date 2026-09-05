const { ChatGroq } = require("@langchain/groq");
const { z } = require("zod");

const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
});

const evaluationSchema = z.object({
    rating: z.number().min(1).max(10),

    feedback: z.string(),

    strengths: z.array(z.string()),

    improvements: z.array(z.string())
});

const evaluator = llm.withStructuredOutput(evaluationSchema);

const evaluateJoinAnswer = async ({
    question,
    answer,
    category
}) => {

    const prompt = `
You are an evaluator for an NGO volunteer application.

Evaluate the applicant's answer based on:

1. Relevance to the question
2. Understanding of the NGO category
3. Genuine motivation
4. Clarity of explanation
5. Practical thinking
6. Potential contribution as a volunteer

NGO Category:
${category}

Question:
${question}

Applicant Answer:
${answer}

The applicant was asked to answer in approximately 100-200 words.

Give a fair and constructive evaluation.

Rating must be between 1 and 10.

Do not judge the applicant based on:
- grammar perfection
- spelling mistakes
- English fluency alone

Focus primarily on the quality and relevance of their ideas.
`;

    //const result = await evaluator.invoke(prompt);

    //return result;
};

module.exports = { evaluateJoinAnswer };