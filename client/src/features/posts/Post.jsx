import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts, getPostsStatus, selectPostById } from "./postsSlice.js";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { fetchUsers, selectUserById } from "../users/usersSlice.js";
import jwt_decode from "jwt-decode";
// import { selectAccessToken } from "../auth/authSlice.js";

const Post = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const accessToken = window.localStorage.getItem("token");
  const navigate = useNavigate()
  const post = useSelector((state) => selectPostById(state, id))
  const user = useSelector((state) => selectUserById(state, post.user))
  const formattedDate = format(new Date(post.createdAt), 'MMMM dd, yyyy');
  const postStatus = useSelector(getPostsStatus);


  useEffect(() => {
    if (!post || !user) {
      dispatch(fetchPosts());
      dispatch(fetchUsers())
    }
  }, [dispatch]);

  const decoded = accessToken ? jwt_decode(accessToken) : undefined;

  const currentUserId = decoded?.UserInfo?.id || ""

  const roles = decoded?.UserInfo?.roles

  const admin = roles.find(role => role === 5150)
  const editor = roles.find(role => role === 1984)
  const authorOfThePost = currentUserId === post.user

  const handleEdit = () => navigate(`/dash/posts/edit/${post._id}`);

  let content

  if (postStatus === "loading") {
   content = <p>loading...</p>
  } else if (postStatus === "succeeded") {
    content = (
      <article className="md:gap-8 md:grid md:grid-cols-3">
        <div>
          <div className="flex items-center mb-6 space-x-4">
            <img className="w-10 h-10 rounded-full" src={`https://avatars.dicebear.com/api/avataaars/${(
              Math.random() + 1
            )
              .toString(36)
              .substring(7)}.svg`} alt="avatar"/>
            <div className="space-y-1 font-medium dark:text-white">
              <p>{user?.username}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg aria-hidden="true" className="w-5 mr-1.5" viewBox="0 0 18 13" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.0531311" width="17" height="12.1429" rx="2" fill="white"/>
                  <g mask="url(#mask0_3885_33060)">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M17.0531 0H0.0531311V0.809524H17.0531V0ZM17.0531 1.61905H0.0531311V2.42857H17.0531V1.61905ZM0.0531311 3.2381H17.0531V4.04762H0.0531311V3.2381ZM17.0531 4.85714H0.0531311V5.66667H17.0531V4.85714ZM0.0531311 6.47619H17.0531V7.28572H0.0531311V6.47619ZM17.0531 8.09524H0.0531311V8.90476H17.0531V8.09524ZM0.0531311 9.71429H17.0531V10.5238H0.0531311V9.71429ZM17.0531 11.3333H0.0531311V12.1429H17.0531V11.3333Z"
                          fill="#D02F44"/>
                    <rect x="0.0531311" width="7.28571" height="5.66667" fill="#46467F"/>
                    <g filter="url(#filter0_d_3885_33060)">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M1.67216 1.21427C1.67216 1.43782 1.49095 1.61903 1.2674 1.61903C1.04386 1.61903 0.86264 1.43782 0.86264 1.21427C0.86264 0.990727 1.04386 0.809509 1.2674 0.809509C1.49095 0.809509 1.67216 0.990727 1.67216 1.21427ZM3.29121 1.21427C3.29121 1.43782 3.10999 1.61903 2.88645 1.61903C2.66291 1.61903 2.48169 1.43782 2.48169 1.21427C2.48169 0.990727 2.66291 0.809509 2.88645 0.809509C3.10999 0.809509 3.29121 0.990727 3.29121 1.21427ZM4.5055 1.61903C4.72904 1.61903 4.91026 1.43782 4.91026 1.21427C4.91026 0.990727 4.72904 0.809509 4.5055 0.809509C4.28195 0.809509 4.10074 0.990727 4.10074 1.21427C4.10074 1.43782 4.28195 1.61903 4.5055 1.61903ZM6.52931 1.21427C6.52931 1.43782 6.34809 1.61903 6.12455 1.61903C5.901 1.61903 5.71978 1.43782 5.71978 1.21427C5.71978 0.990727 5.901 0.809509 6.12455 0.809509C6.34809 0.809509 6.52931 0.990727 6.52931 1.21427ZM2.07693 2.42856C2.30047 2.42856 2.48169 2.24734 2.48169 2.0238C2.48169 1.80025 2.30047 1.61903 2.07693 1.61903C1.85338 1.61903 1.67216 1.80025 1.67216 2.0238C1.67216 2.24734 1.85338 2.42856 2.07693 2.42856ZM4.10074 2.0238C4.10074 2.24734 3.91952 2.42856 3.69597 2.42856C3.47243 2.42856 3.29121 2.24734 3.29121 2.0238C3.29121 1.80025 3.47243 1.61903 3.69597 1.61903C3.91952 1.61903 4.10074 1.80025 4.10074 2.0238ZM5.31502 2.42856C5.53856 2.42856 5.71978 2.24734 5.71978 2.0238C5.71978 1.80025 5.53856 1.61903 5.31502 1.61903C5.09148 1.61903 4.91026 1.80025 4.91026 2.0238C4.91026 2.24734 5.09148 2.42856 5.31502 2.42856ZM6.52931 2.83332C6.52931 3.05686 6.34809 3.23808 6.12455 3.23808C5.901 3.23808 5.71978 3.05686 5.71978 2.83332C5.71978 2.60978 5.901 2.42856 6.12455 2.42856C6.34809 2.42856 6.52931 2.60978 6.52931 2.83332ZM4.5055 3.23808C4.72904 3.23808 4.91026 3.05686 4.91026 2.83332C4.91026 2.60978 4.72904 2.42856 4.5055 2.42856C4.28195 2.42856 4.10074 2.60978 4.10074 2.83332C4.10074 3.05686 4.28195 3.23808 4.5055 3.23808ZM3.29121 2.83332C3.29121 3.05686 3.10999 3.23808 2.88645 3.23808C2.66291 3.23808 2.48169 3.05686 2.48169 2.83332C2.48169 2.60978 2.66291 2.42856 2.88645 2.42856C3.10999 2.42856 3.29121 2.60978 3.29121 2.83332ZM1.2674 3.23808C1.49095 3.23808 1.67216 3.05686 1.67216 2.83332C1.67216 2.60978 1.49095 2.42856 1.2674 2.42856C1.04386 2.42856 0.86264 2.60978 0.86264 2.83332C0.86264 3.05686 1.04386 3.23808 1.2674 3.23808ZM2.48169 3.64284C2.48169 3.86639 2.30047 4.04761 2.07693 4.04761C1.85338 4.04761 1.67216 3.86639 1.67216 3.64284C1.67216 3.4193 1.85338 3.23808 2.07693 3.23808C2.30047 3.23808 2.48169 3.4193 2.48169 3.64284ZM3.69597 4.04761C3.91952 4.04761 4.10074 3.86639 4.10074 3.64284C4.10074 3.4193 3.91952 3.23808 3.69597 3.23808C3.47243 3.23808 3.29121 3.4193 3.29121 3.64284C3.29121 3.86639 3.47243 4.04761 3.69597 4.04761ZM5.71978 3.64284C5.71978 3.86639 5.53856 4.04761 5.31502 4.04761C5.09148 4.04761 4.91026 3.86639 4.91026 3.64284C4.91026 3.4193 5.09148 3.23808 5.31502 3.23808C5.53856 3.23808 5.71978 3.4193 5.71978 3.64284ZM6.12455 4.85713C6.34809 4.85713 6.52931 4.67591 6.52931 4.45237C6.52931 4.22882 6.34809 4.04761 6.12455 4.04761C5.901 4.04761 5.71978 4.22882 5.71978 4.45237C5.71978 4.67591 5.901 4.85713 6.12455 4.85713ZM4.91026 4.45237C4.91026 4.67591 4.72904 4.85713 4.5055 4.85713C4.28195 4.85713 4.10074 4.67591 4.10074 4.45237C4.10074 4.22882 4.28195 4.04761 4.5055 4.04761C4.72904 4.04761 4.91026 4.22882 4.91026 4.45237ZM2.88645 4.85713C3.10999 4.85713 3.29121 4.67591 3.29121 4.45237C3.29121 4.22882 3.10999 4.04761 2.88645 4.04761C2.66291 4.04761 2.48169 4.22882 2.48169 4.45237C2.48169 4.67591 2.66291 4.85713 2.88645 4.85713ZM1.67216 4.45237C1.67216 4.67591 1.49095 4.85713 1.2674 4.85713C1.04386 4.85713 0.86264 4.67591 0.86264 4.45237C0.86264 4.22882 1.04386 4.04761 1.2674 4.04761C1.49095 4.04761 1.67216 4.22882 1.67216 4.45237Z"
                            fill="url(#paint0_linear_3885_33060)"/>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_d_3885_33060" x="0.86264" y="0.809509" width="5.66666" height="5.04761"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                     result="hardAlpha"/>
                      <feOffset dy="1"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3885_33060"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3885_33060" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_3885_33060" x1="0.86264" y1="0.809509" x2="0.86264" y2="4.85713"
                                    gradientUnits="userSpaceOnUse">
                      <stop stopColor="white"/>
                      <stop offset="1" stopColor="#F0F0F0"/>
                    </linearGradient>
                  </defs>
                </svg>
                United States
              </div>
              {(admin || editor || authorOfThePost) && <button onClick={handleEdit} type="button"
                                      className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit post
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </button>}
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-6 md:mt-0">
          <div className="flex items-start mb-5">
            <div className="pr-4">
              <footer>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Published on: {formattedDate}</p>
              </footer>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{post.title}</h4>
            </div>
          </div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">{post.content}</p>
        </div>
      </article>
    )
  } else if (postStatus === "failed") {
    content = <p>error</p>
  }
  return content;
}

export default Post;