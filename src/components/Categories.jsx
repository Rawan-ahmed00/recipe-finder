function Categories({ categories, handleCategory }) {
  return (
    <div className="categories">

      <button onClick={() => handleCategory("All")}>
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.idCategory}
          onClick={() => handleCategory(category.strCategory)}
        >
          {category.strCategory}
        </button>
      ))}

    </div>
  );
}

export default Categories;