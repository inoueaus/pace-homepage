import type { NextPage } from "next";
import InquiryFooter from "../../components/index/InquiryFooter";
import Card from "../../components/UI/Card";

const About: NextPage = () => {
  return (
    <>
      <Card className="wide">
        <h1>
          沖縄県産のコーヒー産業を
          <br />
          開拓する
        </h1>
        <h2>小さな始まりから大きな挑戦へ</h2>
        <span>
          本農園の原点は、小さなきっかけにありました。「沖縄って、コーヒーが栽培できる緯度、コーヒーベルトにあるのに、なぜ県産のコーヒーがないのか」園長はそう考えたのでした。
        </span>
        <span>
          沖縄の産業を活発にするために、観光はもちろん、農業の可能性も開拓するべきでしょう。その一環として、沖縄のコーヒー産業が注目されつつあります。沖縄のコーヒーブームに先駆けて行動したのが、我が農園です。
        </span>
        <span>
          名護の肥沃な農地で、活用されていなかった農地を有効活用できないかと考え、コーヒーに着目したのです。
        </span>
      </Card>
      <Card className="wide">
        <h1>実験を繰り返す努力</h1>
        <h2>その実りが今のPace農園</h2>
        <span>沖縄県産のコーヒーが少ないだけあって、ノーハウもまだまだ周知でなく、試行錯誤が必須。</span>
        <span>我が農園は苗から育て、時間をかけて、沖縄での栽培方法を、苦労を重ねて解明してまいりました。その知識のおかげで、安定した供給能力を実現しているのです。</span>
        <span>コーヒーベルトにあるとはいえ、台風による強風、塩害など、沖縄だからこそある問題がたくさんあります。それに挑戦して、栽培に成功したのが我が園長。</span>
      </Card>
      <InquiryFooter />
    </>
  );
};

export default About;
