import { connectToDatabase } from "@/utils/db";

const handler = async (req, res) => {
  try{
    const client = await connectToDatabase();
    const dataCollection = client.db().collection("data");
    const query = { };
    const documents = await dataCollection.find(query).toArray();
    const sum = documents.reduce((acc, cur) => acc + cur.vote, 0);

    const userCollection = client.db().collection("users");
    const userQuery = { status: "true" };
    const userDocuments = await userCollection.find(userQuery).toArray();
    const userNumbers = userDocuments.map(obj => obj.number);

    const GradeClass = {
      "1학년 1반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "1학년 2반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "1학년 3반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "1학년 4반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "1학년 5반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "1학년 6반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "2학년 1반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "2학년 2반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "2학년 3반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "2학년 4반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "2학년 5반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "2학년 6반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "3학년 1반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "3학년 2반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "3학년 3반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "3학년 4반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "3학년 5반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
      "3학년 6반": {
        voted: [],
        notVoted: [],
        percent: 0,
      },
    };


    for(let e of userNumbers) {
      const _grade = String(e).slice(0, 1);
      const _class = String(e).slice(1, 2);
      const _number = String(e).slice(2, 4);
      GradeClass[`${_grade}학년 ${_class}반`].voted.push(Number(_number));
      GradeClass[`${_grade}학년 ${_class}반`].voted.sort((a, b) => a - b);
      GradeClass[`${_grade}학년 ${_class}반`].notVoted = Array.from({length: 33}, (_, i) => i + 1).filter(e => !GradeClass[`${_grade}학년 ${_class}반`].voted.includes(e));
      GradeClass[`${_grade}학년 ${_class}반`].percent = Math.round(GradeClass[`${_grade}학년 ${_class}반`].voted.length / 33 * 100 * 100) / 100;
    }

    const numbers = documents.map(obj => {
      return {
        number: obj.number,
        vote: obj.vote,
        percent: Math.round(obj.vote / sum * 100 * 100) / 100,
      };
    });
    res.status(200).json({
      status: [{number: 0, vote: sum},...numbers],
      data: GradeClass,
      percent: Math.round(userNumbers.length / (33 * 6 * 3) * 100 * 100) / 100,
    });
  }
  catch(e){
    res.status(400).json({error: true});
  }
};

export default handler;