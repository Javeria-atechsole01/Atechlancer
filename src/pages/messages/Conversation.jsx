import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { messagesService } from '../../services/messagesService';
import { useAuth } from '../../context/AuthContext';
import { Send, ChevronLeft, Loader2, Search, Paperclip, Image as ImageIcon, FileVideo, FileText } from 'lucide-react';

const Conversation = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [msgs, all] = await Promise.all([
          messagesService.list({ otherUserId: userId }),
          messagesService.list()
        ]);
        const ordered = msgs.reverse();
        setMessages(ordered);
        setAllMessages(all);
        if (ordered.length > 0) {
          const first = ordered[0];
          const currentId = user?.id;
          const candidate =
            (first.senderId?._id || first.senderId) === currentId
              ? first.receiverId
              : first.senderId;
          setOtherUser(candidate);
        } else {
          setOtherUser({ _id: userId, name: 'User' });
        }
      } catch (err) {
        console.error('Failed to load conversation', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const contacts = useMemo(() => {
    const map = new Map();
    for (const m of allMessages) {
      const currentId = user?.id;
      const other =
        (m.senderId?._id || m.senderId) === currentId ? m.receiverId : m.senderId;
      const otherId = other?._id || other;
      const prev = map.get(otherId);
      if (!prev || new Date(m.createdAt) > new Date(prev.createdAt)) {
        map.set(otherId, {
          id: otherId,
          name: other?.name || 'User',
          photo: other?.photo,
          lastMessage: m.message,
          createdAt: m.createdAt
        });
      }
    }
    const arr = Array.from(map.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (query.trim()) {
      const q = query.toLowerCase();
      return arr.filter((c) => c.name.toLowerCase().includes(q));
    }
    return arr;
  }, [allMessages, user, query]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && files.length === 0) return;
    setSending(true);
    try {
      const msg = await messagesService.send({
        receiverId: userId,
        message: text,
        attachments: files
      });
      setMessages((prev) => [...prev, msg]);
      setText('');
      setFiles([]);
    } catch (err) {
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container flex items-center justify-center" style={{ minHeight: '40vh' }}>
          <Loader2 className="animate-spin text-primary-600" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: '70vh' }}>
            <aside style={{ borderRight: '1px solid var(--gray-200)', background: '#f9fafb' }}>
              <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Search size={18} className="text-gray-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
              <div style={{ overflowY: 'auto', maxHeight: 'calc(70vh - 60px)' }}>
                {contacts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/messages/${c.id}`)}
                    style={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: '56px 1fr',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid var(--gray-100)',
                      background: c.id === userId ? '#eef2ff' : 'transparent',
                      textAlign: 'left'
                    }}
                  >
                    <img
                      src={c.photo || 'https://via.placeholder.com/40'}
                      alt={c.name}
                      style={{ width: 40, height: 40, borderRadius: '9999px' }}
                    />
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700 }}>{c.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                          {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.lastMessage}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <main style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="px-6 py-4 bg-blue border-b flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="btn btn-link">
                  <ChevronLeft size={15} /> Back
                </button>
                <img
                  src={otherUser?.photo || 'https://via.placeholder.com/40'}
                  alt={otherUser?.name}
                  style={{ width: 40, height: 40, borderRadius: '9999px' }}
                />

              </div>

              <div className="p-6" style={{ flex: 1, background: '#fafafa' }}>
                {messages.length === 0 ? (
                  <div className="empty-placeholder-box">No messages yet</div>
                ) : (
                  <div className="space-y-3">
                    <div style={{ textAlign: 'center', margin: '0.5rem 0', color: 'var(--gray-500)', fontSize: '0.8rem' }}>
                      {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    {messages.map((m) => {
                      const mine = m.senderId?._id === user?.id || m.senderId === user?.id;
                      return (
                        <div key={m._id} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '0.75rem' }}>
                          {!mine && (
                            <img
                              src={(otherUser && otherUser.photo) || 'https://via.placeholder.com/36'}
                              alt="avatar"
                              style={{ width: 36, height: 36, borderRadius: '9999px', marginTop: '2px' }}
                            />
                          )}
                          <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                            <div
                              className="px-4 py-2 rounded-2xl"
                              style={{
                                maxWidth: '70%',
                                // background: mine ? '#2563eb' : 'white',
                                color: mine ? '#020202ff' : 'var(--gray-800)',
                                border: mine ? 'none' : '1px solid var(--gray-200)'
                              }}
                            >
                              {m.message && <div style={{ whiteSpace: 'pre-wrap' }}>{m.message}</div>}
                              {Array.isArray(m.attachments) && m.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {m.attachments.map((a) => {
                                    const mime = a.type || '';
                                    if (mime.startsWith('image/')) {
                                      return (
                                        <img
                                          key={a.url}
                                          src={a.url}
                                          alt={a.name || 'image'}
                                          style={{ maxWidth: '100%', borderRadius: '0.5rem' }}
                                        />
                                      );
                                    }
                                    if (mime.startsWith('video/')) {
                                      return (
                                        <video key={a.url} src={a.url} controls style={{ width: '100%', borderRadius: '0.5rem' }} />
                                      );
                                    }
                                    return (
                                      <a
                                        key={a.url}
                                        href={a.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 rounded-md"
                                        style={{ background: mine ? 'rgba(255,255,255,0.15)' : '#f3f4f6', color: mine ? '#fff' : 'inherit' }}
                                      >
                                        <FileText size={16} />
                                        <span style={{ fontSize: '0.9rem' }}>{a.name || 'Attachment'}</span>
                                      </a>
                                    );
                                  })}
                                </div>
                              )}
                              <div className="text-xs opacity-70 mt-1">
                                {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={endRef} />
                  </div>
                )}
              </div>

              <form onSubmit={handleSend} className="p-4 bg-white border-t flex items-center gap-3">
                <textarea
                  className="flex-1 p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  placeholder="Write a reply..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={1}
                  style={{ height: '44px' }}
                />
                <div className="flex items-center gap-2">
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xlsx,.zip,.txt"
                    style={{ display: 'none' }}
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  />
                  <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('file-input').click()}>
                    <Paperclip size={18} />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={(!text.trim() && files.length === 0) || sending}
                  className="btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  Send
                </button>
              </form>
              {files.length > 0 && (
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  {files.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
                      {f.type.startsWith('image/') && <ImageIcon size={16} />}
                      {f.type.startsWith('video/') && <FileVideo size={16} />}
                      {!f.type.startsWith('image/') && !f.type.startsWith('video/') && <FileText size={16} />}
                      <span>{f.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
