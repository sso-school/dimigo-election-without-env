import axios from "axios";

import { connectToDatabase } from "@/utils/db";
import * as env from "@/utils/env";

const handler = async (req, res) => {
  const { selected, code } = req.query;
  res.redirect(`/message?m=${encodeURIComponent("투표 기간이 아닙니다.")}`);

  try{
    const {data: kakaoTokens} = await axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        grant_type: "authorization_code",
        client_id: env.KAKAO_REST_KEY,
        redirect_uri: `${env.KAKAO_REDIRECT_URI}?selected=${selected}`,
        code: code,
      },
    });
    const {data: {id: kakaoUUID}} = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        "Authorization": `Bearer ${kakaoTokens.access_token}`
      }
    });
    const {data: fullserviceData} = await axios({
      method: "post",
      url: env.DIMIGOIN_FULLSERVICE_CHECK_URL,
      data: {
        "code": String(kakaoUUID),
      }
    });
    if(fullserviceData.status === "fail"){
      res.redirect(env.DIMIGOIN_FULLSERVICE_SIGNUP_URL);
      return;
    }
    const client = await connectToDatabase();
    const userCollection = client.db().collection("users");
    const query = { status: "true" };
    const documents = await userCollection.find(query).toArray();
    const numbers = documents.map(obj => obj.number);
    const isVoted = numbers.includes(fullserviceData.number);

    if(isVoted) {
      res.redirect(`/message?m=${encodeURIComponent("이미 투표한 사용자입니다.")}`);
      return;
    }

    const dataCollection = client.db().collection("data");
    const dataQuery = { number: Number(selected) };
    const dataDocuments = await dataCollection.find(dataQuery).toArray();

    const data = dataDocuments[0].vote + 1;
    const dataResult = await dataCollection.updateOne(dataQuery, { $set: { vote: data } });

    const result = await userCollection.insertOne({
      number: fullserviceData.number,
      status: "true",
    });
    const success = dataResult.acknowledged && result.acknowledged;

    if(!success){
      res.redirect(`/message?m=${encodeURIComponent("아무도 모르는 사유로 투표에 실패했어요. 관리자에게 연락해 주세요. 010-9506-2709")}`);
      return;
    }
    res.redirect(`/message?m=${encodeURIComponent("투표가 완료되었습니다! 감사합니다!")}`);
  }
  catch(e){
    res.redirect(`/message?m=${encodeURIComponent("투표에 실패했어요. 다시 투표해 주세요.")}`);
  }

};

export default handler;