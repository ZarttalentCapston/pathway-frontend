export const sendContactForm = async (formData) => {
  try {
    const response = await fetch("http://localhost:7000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Something went wrong.");
    }

    return result;
  } catch (error) {
    console.error("Contact form error:", error.message);
    throw error;
  }
};
