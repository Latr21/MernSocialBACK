let products = [];

exports.Create = async (data) => {
  try {
    const { label, description, price } = data;

    const isExists = products.find((product) => product.label === label);

    if (isExists) {
      return {
        error: true,
        message: "Un produit existe déjà avec ces informations.",
        statusCode: 400,
      };
    }

    const newProductData = {
      id: !products.length ? 1 : products[products.length - 1].id + 1,
      label: label.trim(),
      description: description.trim(),
      price,
      stock: false,
    };

    products.push(newProductData);

    return {
      error: false,
      message: "Produit créé avec succès.",
      data: newProductData,
      statusCode: 201,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
      statusCode: 500,
    };
  }
};

exports.GetOne = async (id) => {
  try {
    const product = products.find((product) => product.id === id);

    return {
      error: product ? false : true,
      message: product
        ? "Produit récupéré avec succès."
        : "Produit introuvable.",
      data: product || null,
      statusCode: product ? 200 : 404,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
      statusCode: 500,
    };
  }
};

exports.GetAll = async () => {
  try {
    return {
      error: false,
      message: "Produits récupérés avec succès.",
      data: products,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
      statusCode: 500,
    };
  }
};

exports.UpdateOne = async (id, data) => {
  try {
    const { label, description, price, stock } = data;

    const product = products.find((product) => product.id === id);

    if (!product) {
      return {
        error: true,
        message: "Le produit est introuvable.",
        statusCode: 404,
      };
    }

    const updatedProduct = {
      label: label ?? product.label,
      description: description ?? product.description,
      price: price ?? product.price,
      stock: !!+stock ?? product.stock,
    };

    // Mettre à jour dans la base de données
    const productIndex = products.findIndex((product) => product.id === id);

    products[productIndex] = {
        ...products[productIndex],
        ...updatedProduct
    }

    // products = products.map((product) => {
    //   if (product.id === id) {
    //     return {
    //       ...product,
    //       updatedProduct,
    //     };
    //   } else {
    //     return product;
    //   }
    // });

    return {
      error: false,
      message: "Produit mis à jour avec succès.",
      data: updatedProduct,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
      statusCode: 500,
    };
  }
};

exports.DeleteOne = async (id) => {
  try {
    const productIndex = products.findIndex((product) => product.id === id);

    if (!productIndex || productIndex === -1) {
      return {
        error: true,
        message: "Le produit est introuvable.",
        statusCode: 404,
      };
    }

    products.splice(productIndex, 1);

    return {
      error: false,
      message: "Produit supprimé avec succès.",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
      statusCode: 500,
    };
  }
};
