const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDate = new Date(dateString).toLocaleDateString(
    "id-ID",
    options
  );
  return formattedDate;
};

module.exports = formatDate;
