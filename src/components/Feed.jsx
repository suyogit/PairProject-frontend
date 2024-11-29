import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getFeed = async (currentPage = 1) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
        params: {
          page: currentPage,
          limit: 5, 
        },
      });

      if (res.data.data) {
        dispatch(addFeed(res.data.data));
        setPage(currentPage + 1);
      }
    } catch (err) {
      //console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFeed(1);
  }, []);

  useEffect(() => {
    if (feed && feed.length === 0) {
      getFeed(page);
    }
  }, [feed]);


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
