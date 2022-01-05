import axios from "axios";
import { useEffect, useState } from "react";

const CategoriesAPI = () => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await axios.get("/api/category");

        setCategories(categories.data.categories);
      } catch (err) {
        console.log("categoriesAPI: ", err.response.data.msg);
        // alert(err.response.data.error);
      }
    };

    getCategories();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
};

export default CategoriesAPI;
