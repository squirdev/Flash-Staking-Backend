import PRICE from "./price";
import History from "./history";

const API = (router: any) => {
    router.get("/ftt-price", PRICE.fttPrice);
    router.post("/flash-price", PRICE.flashPrice);
    router.get("/staking-history", History.stakingHistory);
};

export default API;
