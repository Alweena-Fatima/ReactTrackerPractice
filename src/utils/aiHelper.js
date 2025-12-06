export const getProblemHint = async (problemTitle) => {
  try {
    // We now call OUR OWN backend function
    const response = await fetch('/api/hint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ problemTitle }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch hint");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Hint Error:", error);
    return null;
  }
};