import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log("res", res);
      // console.log("res?.data", res?.data);
      // console.log("res?.data?.data", res?.data?.data);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (feed === null)
    return <h1 className="flex justify-center my-10">Loading...</h1>;
  if (!feed) return;
  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10 pb-20">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
