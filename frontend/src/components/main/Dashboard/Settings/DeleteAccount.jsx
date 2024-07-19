import { IoIosTrash } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/profile";

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const handleDeleteAccount = () => {
    dispatch(deleteAccount(token, navigate));
  };
  return (
    <div className="flex max-sm:flex-col gap-2 md:gap-7">
      <div>
        <IoIosTrash
          size={50}
          className="text-pink-500 bg-pink-900 p-2 rounded-full"
        />
      </div>
      <div>
        <h3 className="font-bold text-xl text-white">Delete Account</h3>
        <p className="text-pure-greys-200">Would you like to delete account?</p>
        <p className="text-pure-greys-200">
          This account contains Paid Courses. Deleting your account will remove
          all the contain associated with it.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="text-pink-200 hover:underline"
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
}
