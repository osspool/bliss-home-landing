import homeData from "@/data/home.json";

const Categories = () => {
  return (
    <section className="py-20">
      <div className="luxury-container">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeData.categories.map((category) => (
            <a
              key={category.id}
              href="#"
              className="group relative overflow-hidden aspect-square"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:opacity-50" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl font-serif mb-2">{category.name}</h3>
                <p className="text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {category.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;