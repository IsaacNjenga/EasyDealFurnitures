import { Input, Modal, Typography, Row, Col, Empty, Spin } from "antd";
import { useUser } from "../context/UserContext";
import { useSearch } from "../context/SearchContext";
import { CloseOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import ItemCard from "./ItemCard";

const { Search } = Input;
const { Title, Text } = Typography;

function SearchModal() {
  const { isMobile } = useUser();
  const {
    loading,
    searchOpen,
    setSearchOpen,
    searchTerm,
    results,
    onSearchChange,
    clearSearch,
  } = useSearch();

  const handleClose = () => {
    setSearchOpen(false);
    clearSearch();
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <Modal
          footer={null}
          open={searchOpen}
          centered
          onCancel={handleClose}
          width={isMobile ? "100vw" : "85vw"}
          style={{
            top: 0,
          }}
          styles={{
            mask: { backdropFilter: "blur(2px)" },
            content: {
              background: "linear-gradient(135deg, #1b1b27, #242437 100%)",
              border: "none",
              borderRadius: 12,
              overflow: "hidden",
              padding: 0,
            },
          }}
          closeIcon={
            <CloseOutlined
              style={{
                color: "#fff",
                fontSize: 20,
                background: "rgba(0,0,0,0.5)",
                borderRadius: "50%",
                padding: 4,
              }}
            />
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{
                position: "relative",
                minHeight: isMobile ? "100vh" : "100vh",
                maxHeight: isMobile ? "100vh" : "100vh",
                overflow: "auto",
              }}
            >
              {/* Search Header */}
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  minHeight: 180,
                  background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${"https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?w=900"}) no-repeat center center/cover`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    padding: 20,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: isMobile ? "100%" : "50%",
                  }}
                >
                  <Search
                    placeholder="Search by name, type, category..."
                    size="large"
                    loading={loading}
                    enterButton
                    onChange={onSearchChange}
                    value={searchTerm}
                    allowClear
                    style={{
                      width: "100%",
                      maxWidth: isMobile ? 400 : 600,
                    }}
                  />
                </div>
              </div>

              {/* Results Section */}
              <div style={{ padding: "16px 32px", minHeight: 600 }}>
                {/* Search term display */}
                {searchTerm && (
                  <div
                    style={{
                      marginBottom: 5,
                      position: isMobile ? "absolute" : "sticky",
                      top: 0,
                      zIndex: 10,
                    }}
                  >
                    <Title
                      level={5}
                      style={{
                        fontFamily: "Raleway",
                        color: "#fff",
                        marginBottom: 8,
                      }}
                    >
                      Results for "{searchTerm}"
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.7)" }}>
                      {loading
                        ? "Searching..."
                        : `${results.length} ${
                            results.length === 1 ? "result" : "results"
                          } found`}
                    </Text>
                  </div>
                )}

                {/* Loading State */}
                {loading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 200,
                    }}
                  >
                    <Spin size="large" tip="Searching products..." />
                  </div>
                )}

                {/* No Results */}
                {!loading && searchTerm && results.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 200,
                    }}
                  >
                    <Empty
                      description={
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>
                          No products found for "{searchTerm}"
                          <br />
                          Try different keywords or check spelling
                        </span>
                      }
                    />
                  </div>
                )}

                {/* Results Grid */}
                {!loading && results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Row gutter={[16, 16]}>
                      {results.map((product) => (
                        <Col
                          key={product._id}
                          xs={24}
                          sm={12}
                          md={8}
                          lg={6}
                          xl={6}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.1 }}
                          >
                            <ItemCard dataSource={product} height="250" />
                          </motion.div>
                        </Col>
                      ))}
                    </Row>
                  </motion.div>
                )}

                {/* Empty state when no search */}
                {!searchTerm && !loading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 200,
                    }}
                  >
                    <Empty
                      description={
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>
                          Start typing to search for products
                        </span>
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;
