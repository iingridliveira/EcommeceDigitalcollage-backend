const handleError = (err, res) => {
  if (err.response) {
    // Error from external API
    res.status(err.response.status).json({
      error: err.response.data || "Error in external API",
    });
  } else if (err.request) {
    // No response from external API
    res.status(504).json({
      error: "Gateway Timeout: No response from external server.",
    });
  } else if (err.request) {
    // Redundante, já que o 'else if' anterior também verifica 'err.request'
    res.status(401).json({ error: "Invalid authentication credentials" });
  } else if (err.request) {
    // Redundante
    res.status(400).json({
      error: "Due to something that was interpreted as a client error",
    });
  } else if (err.request) {
    // Redundante
    res.status(404).json({ error: "Resource not found" });
  } else if (err.request) {
    // Redundante
    res
      .status(200)
      .json({
        error:
          "Indicates that the REST API successfully executed any action requested by the client, but I cannot return",
      }); // Mensagem ambígua
  } else if (err.request) {
  res
    .status(204)
    .json({ error: "A resposta 204 NÃO DEVE incluir um corpo de mensagem" });} else {
    // Other internal errors
    console.error(err.message); // Log the error for debugging
    res.status(500).json({ error: "Internal server error." });
  }
};

export { handleError };
