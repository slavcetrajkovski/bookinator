import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom'
import RoomTypeSelector from '../common/RoomTypeSelector';

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {roomId} = useParams()

  const handleRoomInputChange = (e) => {
    const {name, value } = e.target
    setRoom({...room, [name]: value}) 
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  }

  useEffect(() => {
    const fetchRoom = async () => {
      try {
          const roomData = await getRoomById(roomId);
          setRoom(roomData)
          setImagePreview(roomData.photo)
      } catch (error) {
          console.log(error)
      }
    }

    fetchRoom()

  }, [roomId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const respone = await updateRoom(roomId, room);
      if(respone.status === 200) {
        setSuccessMessage("Room updated successfully!");
        const updatedRoomData = await getRoomById(roomId)
        setRoom(updatedRoomData)
        setImagePreview(updatedRoomData.photo)
        setErrorMessage("");

      } else {
        setErrorMessage("Error adding room")
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  return (
    <>
      <section className="container, mt-5 mb-5">
        <h3 className="text-center mb-5 mt-5">Edit Room</h3>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label hotel-color">
                  Room Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomType"
                  name="roomType"
                  value={room.roomType}
                  onChange={handleRoomInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label hotel-color">
                  Room Price
                </label>
                <input
                  className="form-control"
                  id="room-price"
                  type="number"
                  name="roomPrice"
                  value={room.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="roomPhoto" className="form-label hotel-color">
                  Room Photo
                </label>
                <input
                  required
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={`data:image/jpeg;base64,${imagePreview}`}
                    alt="Room Preview"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mt-3"
                  />
                )}
              </div>

              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link
                  to={"/existing-rooms"}
                  className="btn btn-outline-info ml-5"
                >
                  Back
                </Link>
                <button className="btn btn-outline-warning" type="submit">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditRoom